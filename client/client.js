
var fetch = function(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    resolve(JSON.parse(xhr.responseText))
                }
                catch (e) {
                    reject(e)
                }
            }
            else {
                reject(xhr)
            }
        }
        xhr.send()
    })
}

var app = new Vue({
    el: '#app',
    data: {
        page: 0,
        limit: 10,
        items: []
    },
    methods: {
        fetchItems() {
            fetch(`http://localhost:4000/?page=${this.page}&limit=${this.limit}`)
                .then(function(res) {
                    this.items = this.items.concat(res.items)
                }.bind(this))
                .catch(function(err) {
                    alert('Error: ' + err)
                })
        },
        fetchNext() {
            this.page++
            this.fetchItems()
        }
    },
    mounted() {
        this.fetchItems()
    }
})
