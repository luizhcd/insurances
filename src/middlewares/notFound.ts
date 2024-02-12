export default function notFound(req, res): void {
    res.status(404).send('Route does not exist')
}
