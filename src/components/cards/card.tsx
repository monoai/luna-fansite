import * as React from 'react';
import './card.css';

export const Card = (props: React.PropsWithChildren<{}>) => (
    <div className="card">{props.children}</div>
)