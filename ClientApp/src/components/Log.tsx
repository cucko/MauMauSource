import React, { useRef, useEffect } from "react";
import { cardToString } from "../model/Card";
import { ILog } from "../model/Game";


interface Props {
  loggedItems: Array<ILog>;
}



export function Log(props: Props) {
  const log = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (log && log.current)
      log.current.scrollTop = log.current.scrollHeight;
  }, [props.loggedItems]);

  return (
    <div id="log" ref={log}>
      {!!props.loggedItems && props.loggedItems.map((l, i) =>
        <div key={`log-item${i}`}>
          <small>{l.timestamp.toLocaleTimeString()}</small>
          {l.player && l.player.name} <strong className={l.action.replace(/ /g, '-')}>{l.action}</strong> {l.card && cardToString(l.card)}
        </div>
      )}
    </div>
  );
}
