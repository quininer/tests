love = (function(){
    var u = {
        version:{
            name:"Elastic Love",
            author:"quininer",
            version:"141229"
        },
        conf:{
            protocol:"{{= protocol }}",
            host:"{{= host }}",
            id:"{{= id }}"
        },
        run:{
            jsonp:{},
            args:{},
            data:{},
            foo:{}
        }
    };

    u.op = {
        bind:function(e, name, foo){
            (e.addEventListener)?(
                e.addEventListener(name, foo, false)):(
                e.attachEvent('on'+name, foo));
            return e;
        },
        random:function(i){return i?(Math.random().toString(36).slice(2)):(Math.random()*1e5)},

        hook:function(foo, hook){
            return function(){
                return (typeof hook == 'function')?(
                    Array.prototype.unshift.call(arguments, foo),
                    hook.apply(this, arguments)
                ):foo.apply(this, arguments);
            };
        }
    };

    u.code = {
        urlen:function(datas, post){
            var uri = '';
            for(var data in datas){
                uri += (data+'='+encodeURIComponent(datas[data])+(post?';':'&'));
            }
            return uri.slice(0, -1);
        },
        quote:function(num){
            var hex = '';
            for(var i in num){
                var dump = num.charCodeAt(i).toString(16).toUpperCase();
                hex += (dump.length < 2)?'%0':'%' + dump;
            }
            return hex;
        }
    },

    u.get = {
        isorigin:function(url, url2){
            var one = u.dom.create('a', {'href':url});
            var two = u.dom.create('a', {'href':url2||document.location.origin});
            return (
                (one.protocol == two.protocol)
                &&(one.hostname == two.hostname)
                &&(one.port == two.port)
            )?true:false;
        },
        testorigin:function(url){
            try{
                u.req.ajax(url);
            }catch(e){
                return (e.code != 19)?true:false;
            };
            return true;
        },

        protocol:u.conf.protocol?u.conf.protocol:((location.protocol == 'file:')?'http:':''),
        isdom:function(e){return e.nodeType?true:false},
        id:function(name){return document.getElementById(name)},
        name:function(name){return document.getElementsByName(name)},
        tag:function(name){return document.getElementsByTagName(name)},
        class:function(name){return document.getElementsByClassName(name)},
        html:function(){return this.tag('html')[0]||(document.write('<html>')&this.tag('html')[0])},
        head:function(){return this.tag('head')[0]||u.dom.add('head', false, this.html())},
        body:function(){return this.tag('body')[0]||u.dom.add('body', false, this.html())}
    };

    u.dom = {
        inner:function(dom, hide, e){
            var callback = Array.prototype.slice.call(arguments, -1)[0];
            e = (e&&u.get.isdom(e))?e:u.get.body();
            var t = u.dom.create('div');
            t.innerHTML = dom;
            var i = t.children[0];
            (hide&&(typeof hide != 'function'))&&(i.style.display = 'none');
            this.insert(i, e, (typeof callback == 'function')&&callback);
            return i;
        },

        create:function(tag, attr){
            var e = document.createElement(tag);
            for(i in attr){(typeof attr[i] == 'string')&&this.attr(e, i, attr[i])};
            return e;
        },
        insert:function(e, parent){
            var callback = Array.prototype.slice.call(arguments, -1)[0];
            parent = (parent&&u.get.isdom(parent))?parent:u.get.body();
            parent.appendChild(e);
            (typeof callback == 'function')&&callback(e, parent);
            return e;
        },
        add:function(tag, attr, parent){
            var callback = Array.prototype.slice.call(arguments, -1)[0];
            var e = this.create(tag, attr);
            this.insert(e, parent, callback);
            return e;
        },

        kill:function(e){
            var callback = Array.prototype.slice.call(arguments, -1)[0];
            u.get.isdom(e)&&e.parentNode.removeChild(e);
            (typeof callback == 'function')&&callback();
        },
        attr:function(e, attr, value){
            if(!value)return (e.attributes[attr]||{}).value;
            e.setAttribute(attr, value);
            return e;
        }
    };

    u.load = {
        script:function(url, nrdm){
            var callback = Array.prototype.slice.call(arguments, -1)[0];
            if(!nrdm||typeof nrdm == 'function'){url += url.indexOf('?')?'&_=':'?_=' + u.op.random()};
            var script = u.dom.create('script', {'src':url});
            (typeof callback == 'function')&&u.op.bind(script, 'load', callback);
            u.dom.insert(script, u.get.head(), function(e){
                u.dom.kill(e);
            });
        },
        import:function(loads){
            if(!loads)return;
            var mod = loads.shift();
            var uri = (mod[0].indexOf('/') < 0)?(
                u.get.protocol+'//'+u.conf.host+'/static/modules/'+mod[0]+'/'+mod[0]+'.js'
            ):mod[0];
            var name = (mod[0].indexOf('/') < 0)?mod[0]:(mod[0].split('#')[1]);
            if(!u.run.args[mod[0]])u.run.args[mod[0]] = {};
            if(mod[1])u.run.args[mod[0]].push(mod[1]);
            this.script(uri, true, function(){
                this.import(loads);
            });
        }
    };

    u.req = {
        ajax:function(url, datas, headers, nsync, ijson){
            var callback = Array.prototype.slice.call(arguments, -1)[0];
            var type = (datas&&(typeof datas != 'function'))?'POST':'GET';
            var xhr = window.XMLHttpRequest?(new XMLHttpRequest()):(new ActiveXObject('Microsoft.XMLHTTP'));

            xhr.open(type, url, (nsync&&(typeof nsync != 'function'))?true:false);
            ((typeof headers != 'object')&&(type=='POST'))&&(
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded'));
            if(typeof headers == 'object'){
                for(var header in headers){
                    xhr.setRequestHeader(header, headers[header]);
                };
            };
            (typeof callback == 'function')&&(xhr.onreadystatechange = function(){
                ((this.readyState == 4)
                 &&(((this.status >= 200)
                     &&(this.status <= 300))
                         ||(this.status == 304))
                )&&callback.apply(this, arguments);
            });
            xhr.send((typeof datas == 'object')?(ijson?JSON.stringify(datas):u.code.urlen(datas)):datas);
            return xhr;
        },

        json:function(url, callname){
            var callback = Array.prototype.slice.call(arguments, -1)[0];
            if(typeof callname == 'string'){
                var backname = 'i'+u.op.random(true);
                (typeof callback == 'function')&&(u.run.jsonp[backname] = u.op.hook(callback, function(callback, json){
                    callback(json);
                    delete u.run.jsonp[backname];
                }));
                u.load.script(url+'?'+callname+'=love.run.jsonp.'+backname);
            }else{
                var json = JSON.parse(this.ajax(url).responseText);
                (typeof callback == 'function')&&callback(json);
                return json;
            };
        },

        post:function(url, datas, jump){
            var callback = Array.prototype.slice.call(arguments, -1)[0];
            var form = u.dom.add('form', {
                'method':'POST',
                'style':'display: none;',
                'action':url,
            }, u.get.body());
            if(datas&&(typeof datas == 'object')){
                for(var name in datas){
                    var input = u.dom.add('input', {
                        'name':name,
                        'value':datas[name]
                    }, form);
                };
            };
            var submit = u.dom.add('input', {'type':'submit'}, form);
            if((!jump)||(typeof jump == 'function')){
                var iframe = u.dom.inner('<iframe sandbox name="'+u.op.random(true)+'">', true);
                u.dom.attr(form, 'target', iframe.name);
            };
            (typeof callback == 'function')&&u.op.bind(form, 'submit', callback);
//            (typeof callback == 'function')&&u.op.bind(iframe, 'load', callback);
            ((!jump)||(typeof jump == 'function'))&&(
                u.op.bind(iframe, 'load', function(){
                    u.dom.kill(iframe);
                })
            );
            submit.click();
            ((!jump)||(typeof jump == 'function'))&&(
                u.dom.kill(form)
            );
        },

        infoback:function(uri, accept, args){
            if(u.socket.conneted[uri]){
                u.socket.conneted[uri].send(JSON.stringify({
                    'accept':accept,
                    'args':args
                }));
            }else{
                this.ajax(u.get.protocol+'//'+u.conf.host+'/'+uri, {
                    'accept':JSON.stringify(accept),
                    'args':JSON.stringify(args)
                }, null, null, true);
            };
        }
    };

    u.socket = {
        conneted:{},
        connet:function(name, ws){
            var callback = Array.prototype.slice.call(arguments, -1)[0];
            this.conneted[name] = ((window.WebSocket)?(new window.WebSocket):(new window.MozWebSocket))(ws);

            (typeof callback == 'function')&&(this.conneted[name].onopen = callback);
            this.conneted[name].onclose = function(){
                delete this.conneted[name];
            };
            return this.conneted[name];
        }
    };

    return u;
}());
