import { useState, useEffect } from 'react';
import './App.css';
import family from './Graph/family';
import createGraph from './Graph/Tree';

function App() {

  const [graph, setGraph] = useState({});
  const [familyObj, setFamilyObj] = useState(family);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const grafo = createGraph(family);
    setGraph(grafo);
    setFamilyObj(family);
    console.log(family);
  }, [])

  const killFamily = (e ,person) => {
    graph.BFS(person, (currentValue) => {
      if(family[currentValue].murderer){
        family[currentValue].alive = false;
        const myDiv = document.getElementById('i'+currentValue);
        myDiv.style.backgroundColor = '#d100ca';
        console.log(family[currentValue]);
        setFamilyObj(family);
        setStatus(1);
        return true;
      }
      else{
        family[currentValue].alive = false;
        const myDiv = document.getElementById('i'+currentValue);
        myDiv.style.backgroundColor = '#e64343';
        console.log(family[currentValue]);
        setFamilyObj(family);
        setStatus(2);
        return false;
      }
    });
  }

  const getStatus = () => {
      var familyDiv = document.getElementsByClassName("family");
      switch(status) {
        case 0:
          return '...';
        case 1:  
          familyDiv[0].addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
          }, true);
          console.log(familyDiv[0]);
          return 'VENCEU';
        case 2:
          familyDiv[0].addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
          }, true);
          console.log(familyDiv[0]);
          return 'PERDEU';
        default:
          return '...';
      }
  }
  
  return (
    <div className="App">
      <h1>Justiceiro</h1>
      <div className="titles">
        <p>
          No ano de 2188, a humanidade estava nas mãos de um único ditador. Sim, essa pessoa que você sabe muito bem quem é, mas todos tem medo de proferir seu nome. Ele possui uma mente horripilante e descartou seu lado humano por poder. 
          Você e um grupo de rebeldes que não aceitam que a humanidade tenha se tornado uma distopia por causa de um único tirano, e arquitetaram um plano para eliminar a existência deste ditador. Sendo assim, seus melhores cientistas construíram uma máquina no tempo. 
        </p>
        <p>
          Porém, vocês possuíam apenas uma chance de voltar no tempo e eliminar uma pessoa da árvore genealógica do ditador, para que assim, ele nunca venha a nascer. Por sorte, você possui um registro com todas as pessoas da família dele, mas você não sabe quais são as ligações de parentesco. Dessa forma, precisará de sorte para eliminar uma pessoa que esteja ligada sequencialmente a ele. O destino da humanidade está em suas mãos, por favor, salve a todos. </p>
        <h1 
          id="statusTitle"
          style={getStatus() === "VENCEU" ? {color: '#399748' } : getStatus() === "PERDEU" ? {color: '#e64343'} : { color: 'black' }}  
        >{getStatus()}</h1>
      </div>
      <div className="family">
        {Object.keys(familyObj).map((person, index) => (
        <div className="pessoaViva" key={index} id={`i${index}`}>
          <div className="infoPessoa" onClick={(e) => killFamily(e,person)}>
            <h1>{familyObj[person].name}</h1>
          </div>
        </div>
        ))}
      </div>
      {status ? <button id="resetButton" onClick={() => {window.location.reload()}}>Reset</button> : <div id="spaceButton"/>}
    </div>
  );
}

export default App;
