export type ITurn = 'Mañana' | 'Tarde' | 'Noche';

export interface IClass{
    Id: number,
    Turn: ITurn,
    Subject: string,
    HourFrom:string,
    HourTo: string
}