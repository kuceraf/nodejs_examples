function init_cache() {
    var init_data = {
        cache_size: 10, // mb
        location: '/tmp',
        type: 'btree'
    };

    var a = arguments;
    for(var i=0; i < a.length; i++) {
        if(typeof a[i] == 'number') {
            console.log('init_data.cache_size =' + a[i]);
            init_data.cache_size = a[i]
        } else if (typeof a[i] == 'object') {
            console.log('init_data =' + a[i]);
            init_data = a[i];
        } else {
            throw new Error('bad parametrs');
        }
    }
}

init_cache({});