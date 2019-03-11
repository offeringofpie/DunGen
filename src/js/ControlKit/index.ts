import ControlKit from 'controlkit';
import store from 'services/globals';

export default class ControlKit {
  kit: ControlKit;
  options: any;

  constructor() {
    this.kit = new ControlKit();
    this.options = {
      size:[96,128,256,512], 
      selection : null
    }
  }

  init() {
    this.addUi();
  }

  addUi() {
    this.kit.addPanel()
      .addGroup()
        .addSubGroup()
          .addNumberOutput(store.pos, 'mouseX',{label:'x'})
          .addSelect(this.options, 'size',{
            label: 'size',
            onChange:function(index){
              store.gridSize = this.options.size[index];
              store.cellSize = {
                w: store.width/store.gridSize,
                h: store.height/store.gridSize
              };
              store.buildGrid();
            }.bind(this)
          });
  }
}