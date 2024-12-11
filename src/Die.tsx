import './Die.css'

export default function Die(props: any) {

    const styles = {
        backgroundColor: props.isHeld ? "rgba(128, 255, 0, 0.29)" : "white"
    }

    return(
        <button style={styles} className="die" onClick={() => props.handleHold(props.id)}>{props.value}</button>
    )
}