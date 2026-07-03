export interface IDeleteBookService {
  /**
   * 削除実行
   * @param 削除する図書UUID
   * @return 削除された図書（非同期）
   */
  execute(uuid: string): Promise<void>;
}
