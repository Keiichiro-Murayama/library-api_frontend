import { TYPES } from "../di/types";
import type { IBookRepository } from "@/Interfaces/IBookRepository";
import type { IDeleteBookService } from "@/Interfaces/IDeleteBookService";
import { inject, injectable } from "inversify";
import { BookRegister } from "../components/api/books/RegisterBook";

@injectable()
export class DeleteBookService implements IDeleteBookService {
  /**
   *コンストラクタ
   */
  constructor(
    @inject(TYPES.IBookRepository) private bookRegistery: IBookRepository,
  ) {}
  async execute(uuid: string): Promise<void> {
    return await this.bookRegistery.delete(uuid);
  }
}
