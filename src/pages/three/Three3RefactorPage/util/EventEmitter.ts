interface newName {
    original: string
    value: string
    namespace: string
}

export default class EventEmitter {
    callbacks: any

    constructor() {
        this.callbacks = {}
        this.callbacks.base = {}
    }

    on(_names: string, callback: any) {
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('wrong names')
            return false
        }

        if (typeof callback === 'undefined') {
            console.warn('wrong callback')
            return false
        }

        const names = this.resolveNames(_names)

        names.forEach((_name: string) => {
            const name = this.resolveName(_name)

            if (!(this.callbacks[name.namespace] instanceof Object)) this.callbacks[name.namespace] = {}

            if (!(this.callbacks[name.namespace][name.value] instanceof Array)) this.callbacks[name.namespace][name.value] = []

            this.callbacks[name.namespace][name.value].push(callback)
        })

        return this
    }

    off(_names: string) {
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('wrong name')
            return false
        }

        const names = this.resolveNames(_names)

        names.forEach((_name: string) => {
            const name = this.resolveName(_name)

            if (name.namespace !== 'base' && name.value === '') {
                delete this.callbacks[name.namespace]
            }
            else {
                if (name.namespace === 'base') {
                    for (const namespace in this.callbacks) {
                        if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][name.value] instanceof Array) {
                            delete this.callbacks[namespace][name.value]

                            if (Object.keys(this.callbacks[namespace]).length === 0) delete this.callbacks[namespace]
                        }
                    }
                } else if (this.callbacks[name.namespace] instanceof Object && this.callbacks[name.namespace][name.value] instanceof Array) {
                    delete this.callbacks[name.namespace][name.value]

                    if (Object.keys(this.callbacks[name.namespace]).length === 0) delete this.callbacks[name.namespace]
                }
            }
        })

        return this
    }

    trigger(_name: string, _args: any = null) {
        if (typeof _name === 'undefined' || _name === '') {
            console.warn('wrong name')
            return false
        }

        let finalResult: Object | null = null
        let result: Object | null = null

        const args = !(_args instanceof Array) ? [] : _args

        const name = this.resolveNames(_name)
        const resolvedName = this.resolveName(name[0])

        if (resolvedName.namespace === 'base') {
            for (const namespace in this.callbacks) {
                if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][resolvedName.value] instanceof Array) {
                    this.callbacks[namespace][resolvedName.value].forEach((callback: any) => {
                        result = callback.apply(this, args)
                        if (typeof finalResult === 'undefined') finalResult = result
                    })
                }
            }
        }
        else if (this.callbacks[resolvedName.namespace] instanceof Object) {
            if (resolvedName.value === '') {
                console.warn('wrong name');
                return this
            }
            this.callbacks[resolvedName.namespace][resolvedName.value].forEach((callback: any) => {
                result = callback.apply(this, args)
                if (typeof finalResult === 'undefined') finalResult = result
            })
        }

        return finalResult
    }

    resolveNames(_names: string) {
        let names = _names
        names = names.replace(/[^a-zA-Z0-9, /.]/g, '')
            .replace(/[,/]+/g, ' ')

        const nameIntoList = names.split(' ')

        return nameIntoList
    }

    resolveName(name: string) {
        const newName: newName = {
            original: '',
            value: '',
            namespace: ''
        }
        const parts = name.split('.')

        newName.original = name
        newName.value = parts[0]
        newName.namespace = 'base'

        if (parts.length > 1 && parts[1] !== '') {
            newName.namespace = parts[1]

        }
        return newName
    }

}