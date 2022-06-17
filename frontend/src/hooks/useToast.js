import {useEffect} from "react";

export function useNotify({notifications, toast}) {
    useEffect(() => {
        var toastsToShow = [];
        notifications.forEach((reason) => {
            toastsToShow.push({severity: "error", summary: reason.split(':')[0], detail: reason.split(':')[1]})
        })
        toast.current.show(toastsToShow)
    }, [notifications])
}