'use strict';

/*
    v1.1.0:
        - Removed: Tree.branching now return dom element (Refactoring)
        + Added: Now you can remove nodes by clicking
    
    v1.2.0
        Added: Now you can randomly add nodes
*/

// Get TreeAPI data
const promise = window.TreeAPI.getData();

// Put received data here
var data;

// I not used 'import' or break to files because it is simple script without uploading to ftp
class Tree {    
    constructor(data, eid) {
        self = this;
        this.data = data;
        this.root = this.branching();
        let el = document.getElementById(eid);
        if(el) {
            this.clear(el);
            el.appendChild(this.root);

            this.root.addEventListener('click', function(event) {
                let target = event.target;
                
                if(target.tagName == 'SPAN') {
                    let parent = target.parentNode;
                    
                    if(!parent.previousSibling && !parent.nextSibling) {
                        self.deleteElement(parent.parentNode);
                    } else {
                        self.deleteElement(parent);
                    }
                }                               
            }, false);      
        }
    }

    clear(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    parent(id) {
        let rows = [];
        if(!this.data) return rows;

        for(let i of this.data) {
            if(i.parent === id) rows.push(i);
        }

        return rows;
    }

    makeElement(name, cls = []) {        
        let el = document.createElement(name);
        if(cls.length) element.classList.add(...cls);     
        return el;      
    }
    
    deleteElement(el) {
        if(!el) return false;
        el.parentNode.removeChild(el);
        return true;
    }

    branching(id = null) {
        let items = this.parent(id);  
        if(!items.length) return undefined;

        let ul = this.makeElement('ul');
        
        for(let i of items) {
            if(!i.id) continue
                                    
            let sub = this.branching(i.id);
            
            let span = this.makeElement('span');            
            let li = this.makeElement('li');
            span.innerText = i.id
                        
            li.appendChild(span);
            ul.appendChild(li);

            if(sub) li.appendChild(sub);                       
        }

        return ul;
    }
}

// Get data from promise and build visual tree
promise.then(
    result => {        
        let tree = new Tree(result.data, 'tree');
        data = result.data;
    },
    error => {
        alert('Something went wrong!');
    }
);

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

  function randomAdd() {
    let cnt = data.length;
    let num = rnd(2, cnt);
    let i = data[num];
    data.push({'id': cnt, 'parent': i.id});
      
    let tree = new Tree(data, 'tree');
}
