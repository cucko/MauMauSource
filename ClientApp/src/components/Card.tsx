import React, { CSSProperties } from "react";
import { ICard, rankLetterMap, getCardTypeProps } from "../model/Card";
import { CardBackground } from "./CardBackground";

interface Props {
  className?: string;
  card: ICard;
  hide?: boolean;
  onCardSelected?: () => void;
  rotate?: number;
}

const valueProps = (color: string, scale = 1) => ({
  fontSize: 34,
  fontWeight: 500,
  textAnchor: 'middle',
  dominantBaseline: 'middle',
  fill: color,
  transform: `scale(${scale})`
})

export function Card(props: Props) {
  const { color, text } = getCardTypeProps(props.card.suit);
  const _rank = rankLetterMap[props.card.rank];

  const getStyleFromRotate = (rotate?: number) : CSSProperties | undefined => {
    if (!props.rotate)
      return undefined;
    return { transform: `rotateZ(${rotate || 0}deg)` }
  }

  if (props.hide)
    return <CardBackground className={props.className} />;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={getStyleFromRotate(props.rotate)} onClick={props.onCardSelected} viewBox="0 0 180 250" className={`deck-card ${props.className}`}>
      <text x="25" y="30" {...valueProps(color)} >
        {_rank}
      </text>
      <text x="25" y="60" {...valueProps(color)} >
        {text}
      </text>
      <text x="90" y="125" {...valueProps(color)} fontSize={128} >
        {text}
      </text>
      <text x="-155" y="-220" {...valueProps(color, -1)} >
        {_rank}
      </text>
      <text x="-155 " y="-190" {...valueProps(color, -1)} >
        {text}
      </text>
    </svg>
  );
}
