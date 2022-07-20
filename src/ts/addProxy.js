export function addProxy(vm, data) {
    if (data === null) {
        return;
    }
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        //数据代理，不直接改变原数据$data，而是通过直接挂载在ViewModel上的数据进行代理
        //this.$data[key]===this[key] => true
        /**
         * 对对象的处理还没有做好，所以视图中要插入对象值时呈现的效果是[object Object]
         */
        Object.defineProperty(vm, key, {
            enumerable: true,
            get() {
                return this.$data[key];
            },
            set(newValue) {
                this.$data[key] = newValue;
                if (this.singleBind[key] !== (null || undefined)) {
                    /**单向&双向绑定，通过触发事件列表中的记录进行控制操作，
                     * 达到View与Model之间数据绑定的效果
                     * */
                    for (let tmp of this.singleBind[key]) {
                        tmp.call(this);
                    }
                }
            },
        });
    }
}
