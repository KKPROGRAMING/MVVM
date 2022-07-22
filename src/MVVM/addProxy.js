export function addProxy(vm, data) {
    if (data === null) {
        return;
    }
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        Object.defineProperty(vm, key, {
            enumerable: true,
            get() {
                return this.$data[key];
            },
            set(newValue) {
                this.$data[key] = newValue;
                if (this.singleBind[key] !== (null || undefined)) {
                    for (let tmp of this.singleBind[key]) {
                        tmp.call(this);
                    }
                }
                if (this.doubleBind[key] !== (null || undefined)) {
                    for (let tmp of this.doubleBind[key]) {
                        tmp.call(this);
                    }
                }
            },
        });
    }
}
