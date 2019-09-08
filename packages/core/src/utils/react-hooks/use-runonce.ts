import React = require('react')

export default function useRunOnce (
    cb: Function,
    conditions: any[] = [],
    should_run: () => boolean = () => Array.isArray(conditions) && conditions.every(x => !!x),
) {
    let called = false

    React.useEffect(() => {
        if (called) return ;
        if (!should_run()) return ;

        called = true;
        cb();
    }, conditions)
}