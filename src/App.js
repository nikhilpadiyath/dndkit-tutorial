import 'bootstrap/dist/css/bootstrap.min.css';
import TeamBoard from './components/TeamBoard';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import PlayerCard from './components/PlayerCard';
import { createPortal } from 'react-dom';



function App() {
    const [playerList, setPlayerList] = useState({
      "Playing XI": ["Rohit Sharma", "Shubman Gill", "Virat Kohli", "Shreyas Iyer", "KL Rahul", "Hardik Pandya", "Ravindra Jadeja", "Kuldeep Yadav","Mohammad Shami","Jasprit Bumrah","Mohammad Siraj"],
      "Reserve Bench": ["Suryakumar Yadav", "Ravi Ashwin", "Prasidh Krishna"],
    });

    const[activeCard, setActiveCard] = useState(null);

    const handleDragStart = (e) => {
      console.log("Started",e);
      if(e.active.data.current?.sortable.containerId === "Playing XI" || e.active.data.current?.sortable.containerId === "Reserve Bench"){
        setActiveCard(e.active.id);
        return;
      }
    }
    const handleDragEnd = (e) => {
      if(!e.over || !e.active.data.current || !e.over.data.current) return;
      if(e.active.id === e.over.id) return;

      if(e.active.data.current?.sortable.containerId !== e.over?.data.current?.sortable.containerId) return;

      const containerName= e.active.data.current?.sortable.containerId;

      setPlayerList((playerList) => {
        const temp= {...playerList};
        const prevIndex = temp[containerName].indexOf(e.active.id.toString());
        const newIndex = temp[containerName].indexOf(e.over.id.toString())
        temp[containerName] = arrayMove(temp[containerName],prevIndex,newIndex);
        return temp;
      });
    };

    const handleDragOver = (e) => {
        //To check if item is dragged to an unknown area
        if(!e.over) return;

        //Get the initial and target sortable list name
        const activeCol = e.active.data.current?.sortable?.containerId;
        const targetCol = e.over.data.current?.sortable?.containerId;

        //If there is no initial sortable list name, then the item is not a sortable item
        if(!activeCol) return;

        //Order the list according to the target item position
        setPlayerList((playerList) => {
          const temp = {...playerList};

          //If there is no target container, item is moved into a droppable zone
          if(!targetCol){
            //If item is already there, then never re-add it
              if(playerList[e.over.id].includes(e.active.id.toString())) return temp;

              //Remove item from its inital container
              temp[activeCol] = temp[activeCol].filter((player) => 
                player !== e.active.id.toString()
              );

              //Add item to its target container which the droppable one belongs to
              temp[e.over.id].push(e.active.id.toString());

              return temp;
          }

          //If item is dragged inside the same container, then re-order the list
          if(activeCol === targetCol){
            const prevIndex = temp[activeCol].indexOf(e.active.id.toString());
            const newIndex = temp[activeCol].indexOf(e.over.id.toString());
            temp[activeCol] = arrayMove(temp[activeCol],prevIndex,newIndex);
          } else {
            //If item is dragged in different container
            //Remove item from the initial container
            temp[activeCol] = temp[activeCol].filter((player) => player !== e.active.id.toString());

            //Add item to the target container
            const newIndex= temp[targetCol].indexOf(e.over.id.toString());
            temp[targetCol].splice(newIndex,0,e.active.id.toString());
          }

          return temp;
        });
    };

  return (
    <DndContext onDragStart = {handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
  <main style={{"display":"flex", "flexDirection":"column","padding": "4px", "alignItems":"center", "backgroundColor":"#0f172a"}}>
      <h1 style={{"color":"white","padding":"10px"}}>World Cup Indian Squad</h1>
      <section style={{"display":"flex", "backgroundColor":"#64748b", "gap":"50px", "padding":"50px"}}>
        
        {Object.keys(playerList).map((key)=> (
       <TeamBoard key={key+playerList[key]} title={key} players={playerList[key]} />
        ))} 
      </section>
  </main>

  {createPortal(
    <DragOverlay >
      {activeCard && (
        <PlayerCard title={activeCard}/>
      )}
    </DragOverlay>,
    document.body
  )}
  </DndContext>
  );

  }

export default App;
