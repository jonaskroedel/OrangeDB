/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

module.exports = {
    progressbar: function (player) {
        let size = 25;
        let line = "▬";
        let slider = "🔘";

        if (!player.queue.current) return `${slider}${line.repeat(size - 1)}]`;
        let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
        let total = player.queue.current.duration;
        let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];

        if (!String(bar).includes(slider)) return `${slider}${line.repeat(size - 1)}`;
        return `${bar[0]}`;
    }
}