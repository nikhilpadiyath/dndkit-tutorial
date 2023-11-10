import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Card} from 'reactstrap';

const PlayerCard = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
        id: props.title
    })

    const style = {transform: CSS.Transform.toString(transform),
                   transition
                }

    if(isDragging){
       return <div ref={setNodeRef} style={{style, "width": "100%", "height":"70px","borderRadius":"5px","border":"5px solid #be123c", "fontWeight":"bold", "backgroundColor":"#115e59","color":"#f0fdfa","opacity":"0.5"}}>
            </div>
    }

    return(
        <div ref={setNodeRef} style= {style} {...attributes} {...listeners} >
            <Card body className="m-3" style={{"width": "100%", "border":"5px solid #134e4a", "fontWeight":"bold", "backgroundColor":"#115e59","color":"#f0fdfa"}} align= "left">{props.title}</Card>
        </div>
    )
}

export default PlayerCard 