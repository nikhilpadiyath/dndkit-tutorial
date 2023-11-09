import { SortableContext } from '@dnd-kit/sortable';
import PlayerCard from './components/PlayerCard';
import {useDroppable} from '@dnd-kit/core';

const TeamBoard = (props) => {

    const { setNodeRef } = useDroppable({
        id: props.title
    })


  return (
    <article>
        <h3 style={{"marginLeft":"40px"}}>{props.title}</h3>
            <SortableContext id={props.title} items={props.players}>
                <div ref={setNodeRef}>
                    {props.players.map((player) => (
                        <PlayerCard key={player} title={player} />
                    ))}
                </div>
            </SortableContext>
    </article>
  );

}

export default TeamBoard;
