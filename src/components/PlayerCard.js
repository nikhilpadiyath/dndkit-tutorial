import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Card} from 'reactstrap';

const PlayerCard = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: props.title
    })

    const style = {transform: CSS.Transform.toString(transform),
                   transition
                }

    return(
        <div ref={setNodeRef} style= {style} {...attributes} {...listeners} >
            <Card body className="m-3" style={{"width": "100%", "border":"5px solid #134e4a", "fontWeight":"bold", "backgroundColor":"#115e59","color":"#f0fdfa"}} align= "left">{props.title}</Card>
        </div>
    )
}

export default PlayerCard 