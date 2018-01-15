
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

/*var flatten = list => list.reduce((a, b) =>
    a.concat(Array.isArray(b) ? flatten(b) : b), [])*/

var app = new Vue({
    el: '#app',
    data: {
        page: 0,
        limit: 10,
        pages: {}
    },
    methods: {
        fetchItems(page, limit) {
            fetch(`http://localhost:4000/?page=${page}&limit=${limit}`)
                .then(function(res) {
                    console.info('Items', res.items)
                    this.pages[page] = res.items
                    console.info('pages', this.pages)
                    this.$forceUpdate()
                }.bind(this))
                .catch(function(err) {
                    alert('Error: ' + err)
                })
        },
        fetchNext() {
            this.page++
            this.fetchItems(this.page, this.limit)
        },
        getItems() {
            let foo = []
            Object.values(this.pages).forEach(items => {
                foo = foo.concat(items)
            })
            console.info('items foo', foo)
            return foo
        },
        getStatus() {
            const items = this.getItems()
            let last = 0
            let inOrder = true
            items.forEach(item => {
                // get the #n number from the item rendered
                const n = parseInt(item.split('#').pop())
                if (n !== (last + 1)) {
                    inOrder = false
                    return
                }
                last = n
            })
            return inOrder
                ? 'Items are all in correct order'
                : 'Item #' + last + ' is not in order'
        }
    },
    mounted() {
        this.fetchItems(this.page, this.limit)
    }
})
