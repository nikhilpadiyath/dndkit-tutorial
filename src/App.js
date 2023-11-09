import 'bootstrap/dist/css/bootstrap.min.css';
import TeamBoard from './TeamBoard';
import { DndContext } from '@dnd-kit/core';
import { arrayMove, arraySwap } from '@dnd-kit/sortable';
import { useState } from 'react';



function App() {
    const [playerList, setPlayerList] = useState({
      "Playing XI": ["Rohit Sharma", "Shubman Gill", "Virat Kohli", "Shreyas Iyer", "KL Rahul", "Hardik Pandya", "Ravindra Jadeja", "Kuldeep Yadav","Mohammad Shami","Jasprit Bumrah","Mohammad Siraj"],
      "Reserve Bench": ["Suryakumar Yadav", "Ravi Ashwin", "Prasidh Krishna"]
    });
    const handleDragEnd = (e) => {
      if(!e.over || !e.active.data.current || !e.over.data.current) return;
      if(e.active.id === e.over.id) return;

      if(e.active.data.current?.sortable.containerId !== e.over?.data.current?.sortable.containerId) return;

      const containerName= e.active.data.current?.sortable.containerId;

      setPlayerList((playerList) => {
        const temp= {...playerList};
        const prevIndex = temp[containerName].indexOf(e.active.id.toString());
        const newIndex = temp[containerName].indexOf(e.over.id.toString());
        temp[containerName] = arrayMove(temp[containerName],prevIndex,newIndex);
        return temp;
      });
    };

    const handleDragOver = (e) => {
        if(!e.over) return;

        const activeCol = e.active.data.current?.sortable?.containerId;
        const targetCol = e.over.data.current?.sortable?.containerId;

        if(!activeCol) return;

        setPlayerList((playerList) => {
          const temp = {...playerList};

          if(!targetCol){
              if(playerList[e.over.id].includes(e.active.id.toString())) return temp;

              temp[activeCol] = temp[activeCol].filter((player) => 
                player !== e.active.id.toString()
              );

              temp[e.over.id].push(e.active.id.toString());

              return temp;
          }

          if(activeCol === targetCol){
            const prevIndex = temp[activeCol].indexOf(e.active.id.toString());
        const newIndex = temp[activeCol].indexOf(e.over.id.toString());
        temp[activeCol] = arrayMove(temp[activeCol],prevIndex,newIndex);
          } else {
            temp[activeCol] = temp[activeCol].filter((player) => player !== e.active.id.toString());

            const newIndex= temp[targetCol].indexOf(e.over.id.toString());
            temp[targetCol].splice(newIndex,0,e.active.id.toString());
          }

          return temp;
        });
    };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
  <main style={{"display":"flex", "flexDirection":"column","padding": "4px", "alignItems":"center", "backgroundColor":"#0f172a"}}>
      <h1 style={{"color":"white"}}>World Cup Indian Squad</h1>
      <section style={{"display":"flex", "backgroundColor":"#64748b", "gap":"50px", "padding":"50px"}}>
        {Object.keys(playerList).map((key)=> (
       <TeamBoard key={key} title={key} players={playerList[key]} />
        ))} 
      </section>
  </main>
  </DndContext>
  );

  }

export default App;
