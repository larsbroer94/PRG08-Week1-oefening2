class GameObject {

    private _x : number = 0;
    private _y : number = 0;
    private _div : HTMLElement;

    public get x(): number          {   return this._x;   }
    public set x(value: number)     {   this._x = value;  }

    public get y(): number          {   return this._y;   }
    public set y(value: number)     {   this._y = value;  }    

    public get div(): HTMLElement          {   return this._div;   }
    public set div(value: HTMLElement)     {   this._div = value;  }       

    constructor(tag: string, parent : HTMLElement) {
        
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
    }

}