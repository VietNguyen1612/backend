import { HttpException, HttpStatus } from '@nestjs/common';

export class PostNotFoundException extends HttpException {
  constructor(post_id: string) {
    super(`Post ${post_id} NOT FOUND`, HttpStatus.NOT_FOUND);
  }
}

export class PostNotPermissionException extends HttpException {
  constructor(post_id: string) {
    super(
      `Cant delete Post ${post_id}, do not have permission`,
      HttpStatus.CONFLICT,
    );
  }
}

export class PostCantBeCreateException extends HttpException {
  constructor() {
    super(`Cant create Post`, HttpStatus.CONFLICT);
  }
}

export class PostIsNotValidException extends HttpException {
  constructor(post_id: string) {
    super(
      `Cant delete Post ${post_id}, the Post_id is not valid, check correct Object_id`,
      HttpStatus.CONFLICT,
    );
  }
}
