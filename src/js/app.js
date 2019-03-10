import Game from 'js/Game';
import ControlKit from 'controlkit';

import store from 'services/globals';


window.addEventListener('load',function(){
  var gridSize = {
    options:[96,128,256,512], 
    selection : null
  };
  gridSize.selection = gridSize.options[0];

	var controlKit = new ControlKit();
	    controlKit.addPanel()
	        .addGroup()
              .addSubGroup()
                .addNumberOutput(store.pos, 'mouseX',{label:'x'})
                .addSelect(gridSize, 'options',{
                  label: 'size',
                  onChange:function(index){
                    store.gridSize = gridSize.options[index];
                    store.cellSize = {
                      w: store.width/store.gridSize,
                      h: store.height/store.gridSize
                    };
                    store.buildGrid();
                    game.init();
                  }
                });
});

const game = new Game();
 
// const gui = new dat.GUI();
