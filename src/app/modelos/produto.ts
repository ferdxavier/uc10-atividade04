export class Produto {
  private _id: string;
  private _titulo: string;
  private _descricao: string;
  private _foto: string;
  private _preco: number;

  constructor(options: {
    id: string;
    titulo: string;
    descricao: string;
    foto: string;
    preco: number;
  }) {
    this._id = options.id;
    this._titulo = options.titulo;
    this._descricao = options.descricao;
    this._foto = options.foto;
    this._preco = options.preco;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Getter titulo
   * @return {string}
   */
  public get titulo(): string {
    return this._titulo;
  }

  /**
   * Getter descricao
   * @return {string}
   */
  public get descricao(): string {
    return this._descricao;
  }

  /**
   * Getter foto
   * @return {string}
   */
  public get foto(): string {
    return this._foto;
  }

  /**
   * Getter preco
   * @return {number}
   */
  public get preco(): number {
    return this._preco;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * Setter titulo
   * @param {string} value
   */
  public set titulo(value: string) {
    this._titulo = value;
  }

  /**
   * Setter descricao
   * @param {string} value
   */
  public set descricao(value: string) {
    this._descricao = value;
  }

  /**
   * Setter foto
   * @param {string} value
   */
  public set foto(value: string) {
    this._foto = value;
  }

  /**
   * Setter preco
   * @param {number} value
   */
  public set preco(value: number) {
    this._preco = value;
  }
}
