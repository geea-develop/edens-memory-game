
type Props = {
    timer: number;
};

export const Timer = ({ timer }: Props) => {
    return <div className="eden-text">{Math.round(timer/1000)}</div>;
}