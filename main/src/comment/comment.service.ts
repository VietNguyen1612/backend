import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import CommentInterface from './comment.interface';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { AddCommentToPostDto } from './dto/add-comment-to-post.dto';
import { UserReposity } from 'src/common/repository/user.repository';
import { GetAllCommentByIdResponse } from './comment.interface';
import { TransformInterceptor } from 'src/common/utils/transform.interceptor';
@Injectable()
export class CommentService {
  private grpcCommentService: CommentInterface;
  constructor(
    @Inject('COMMENT_SERVICE') private readonly commentClient: ClientGrpc,
    private readonly userRepository: UserReposity,
  ) {}
  onModuleInit() {
    this.grpcCommentService =
      this.commentClient.getService<CommentInterface>('CommentService');
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  async getAllCommentById(postId: string) {
    try {
      //let returnValue: GetAllCommentByIdResponse;
      let returnValue = await this.grpcCommentService.getAllCommentById({
        postId,
      });
      console.log(returnValue);
      // data.forEach(async (item) => {
      //   // const user = []
      //   // user.push(item.authorId)
      //   const user = await this.userRepository.findById(item.authorId.toString())
      //   item.authorId = user
      // })
      //console.log(returnValue.data)
      // for (let i = 0; i < returnValue.data.length; i++) {
      //   const user = await this.userRepository.findById(returnValue.data[i].authorId.toString())
      //   returnValue.data[i].authorId = user;
      // }

      return returnValue;
    } catch (err) {
      throw new Error(err);
    }
  }

  @UseInterceptors(GrpcToHttpInterceptor)
  addCommentToPost(addCommentToPostDto: AddCommentToPostDto) {
    return this.grpcCommentService.addCommentToPost(addCommentToPostDto);
  }
}
