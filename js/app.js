'use strict';

// Get TreeAPI data
const promise = window.TreeAPI.getData();

// Put received data here
var data;

// I not used 'import' or break to files because it is simple script without uploading to ftp
class Tree {    
    constructor(data, eid) {
        this.data = data;
        let root = this.branching();
        let el = document.getElementById(eid);
        if(el) el.appendChild(root.dom);
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
    
    branching(id = null) {
        let items = this.parent(id);  
        if(!items.length) return undefined;

        let ul = this.makeElement('ul');
        let cnt = 0;

        for(let i of items) {
            if(!i.id) continue
            cnt++;
                        
            let sub = this.branching(i.id);
            
            let span = this.makeElement('span');            
            let li = this.makeElement('li');
            span.innerText = i.id
                        
            li.appendChild(span);
            ul.appendChild(li);

            if(sub) li.appendChild(sub.dom);               
        }

        return {
            "dom": ul,
            "cnt": cnt
        };
    }
}

// Get data from promise and build visual tree
promise.then(
    result => {        
        let tree = new Tree(result.data, 'tree');
    },
    error => {
        alert('Something went wrong!');
    }
);
