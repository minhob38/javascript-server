import { Injectable } from '@nestjs/common';
import { Processor, Process } from '@nestjs/bull';
import { BoardsRepository } from './boards.repository';
import { IRes } from '../../types/types';
import { Job } from 'bull';

@Processor('boards')
@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async postPosts(
    author: string,
    title: string,
    content: string,
  ): Promise<IRes> {
    await this.boardsRepository.createPost(author, title, content);
    return {
      status: 200,
      message: 'created post',
    };
  }

  @Process('get-posts')
  async doQueue(job: Job<unknown>) {
    console.log('do queue');
    // job.progress();
    return 'do queue return';
  }

  async getPosts(): Promise<IRes> {
    console.log('~~~');
    const posts = await this.boardsRepository.findPosts();
    return {
      status: 200,
      message: 'found posts',
      data: posts,
    };
  }

  async getPost(postId: number): Promise<IRes> {
    const post = await this.boardsRepository.findPost(postId);
    return {
      status: 200,
      message: 'found post',
      data: post,
    };
  }

  async patchPost(postId: number, content: string): Promise<IRes> {
    await this.boardsRepository.updatePost(postId, content);
    return {
      status: 200,
      message: 'edited post',
    };
  }

  async deletePost(postId: number): Promise<IRes> {
    await this.boardsRepository.removePost(postId);
    return {
      status: 200,
      message: 'deleted post',
    };
  }
}
