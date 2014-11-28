gum = function(){
    var u = {
        'version':'1140828',
        'domain':'{{domain}}',
        'backinfo':{}
    };

    u.e = function(code){try{return eval('('+code+')')}catch(e){return ''}};
    u.jquery = function(){if(u.e('$().jquery')){return 1}else{return 0}};
    u.id = function(id){return document.getElementById(id)};
    u.name = function(name){return document.getElementsByName(name)};
    u.rdm = function(){return Math.random()*1e5};

    u.html = function(){
        return document.getElementsByTagName('html')[0]
            ||document.write('<html>')
                ||document.getElementsByTagName('html')[0];
    };

    u.bind = function(e, name, foo){
        if(u.jquery()){
            $(e).bind(name, foo);
        }else{
            (e.addEventListener)?(
                e.addEventListener(name, foo, false)):(
                e.attachEvent('on'+name, foo));
        };
    };

    u.ready = function(foo){
        if (document.onDOMContentLoaded){
            u.bind(document, 'DOMContentLoaded', foo);
        }else{
            var r = setInterval(function(){
                try{
                    document.body.doScroll('left');
                    clearInterval(r);
                    foo();
                }catch(e){};
            }, 5);
        };
    };

    u.kill = function(dom){
        if(u.jquery()){
            $(dom).remove();
        }else{
            dom.parentElement.removeChild(dom);
        };
    };

    u.addom = function(html, doming, hide, callback){
        doming = doming||u.html();
        var temp = document.createElement('span');
        temp.innerHTML = html;
        var dom = temp.children[0];
        (hide)&&(dom.style.display = 'none');
        callback&&u.bind(dom, 'load', callback);
        doming.appendChild(dom);
        return dom;
    };

    u.script = function(url, callback){
        if(u.jquery()){
            $.getScript(url, callback);
        }else{
            url += '?_=' + u.rdm();
            var script = document.createElement('script')
            document.documentElement.appendChild(script).src=url;
            callback&&u.bind(script, 'load', callback);
            u.kill(script);
        };
    };

    u.ajax = function(url, datas, headers, callback){
        var xhr;
        var type = datas?('POST'):('GET');
        if(u.jquery()){
            xhr = $.ajax({
                type:type,
                url:url,
                data:datas,
                headers:headers,
                success:callback
            });
            return xhr;
        }else{
            (window.XMLHttpRequest)?(
                xhr = new XMLHttpRequest()):(
                xhr = new ActiveXObject('Microsoft.XMLHTTP'));
            xhr.open(type, url, false);
            (type=='POST')&&(
                xhr.setRequestHeader('content-type',
                                     'application/x-www-form-urlencoded'));
            if(headers){
                for(var header in headers){
                    xhr.setRequestHeader(header, headers[header]);
                };
            };
            callback&&(xhr.onreadystatechange = function(){
                (this.readyState == 4 && (
                    (this.status >= 200 && this.status <= 300)
                        || this.status == 304)
                )&&callback.apply(this, arguments);
            });
            xhr.send(datas);
            return xhr;
        };
    };

    u.post = function(url, data, nj, callback){
        var form = u.addom("<form method='POST'>", u.html(), true);
        form.action = url;
        for(var name in data){
            var input = document.createElement('input');
            input.name = name;
            input.value = data[name];
            form.appendChild(input);
        };
        if(!nj){
            var iframe = u.addom('<iframe sandbox name=_'+u.rdm()+'_>', u.html(), true);
            form.target = iframe.name;
        };
        form.submit();
        callback&&callback();
        (!nj)&&(u.kill(form))&(setTimeout(function(){
            u.kill(iframe);
        }, 3*1000));
    };

    return u;
}();
