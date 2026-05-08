const REFERENCE_DATES = {
    raid40: '24/05/2023 04:00:00',
    onyxia: '30/05/2023 04:00:00',
    karazhan: '31/05/2023 04:00:00',
    raid20: '28/05/2023 04:00:00',
    timbermaw: '20/03/2026 04:00:00',
    eom: '24/10/2023 00:00:00',
    honor: '23/05/2023 23:00:00',
    weeklyQuests: '24/05/2023 23:00:00',
    bg: '13/10/2023 00:00:00',
    dmf: '15/10/2023 00:00:00'
};

const EVENTS = [
    { id: 'raid40', name: 'Raid 40', subtitle: 'MC/BWL/AQ40/Naxx/ES', cycle: 7, ref: REFERENCE_DATES.raid40, img: 'assets/mc.jpg' },
    { id: 'onyxia', name: 'Onyxia', subtitle: 'Lair of the Broodmother', cycle: 5, ref: REFERENCE_DATES.onyxia, img: 'assets/ony.jpg' },
    { id: 'karazhan', name: 'Karazhan', subtitle: 'The Ivory Tower', cycle: 5, ref: REFERENCE_DATES.karazhan, img: 'assets/kara.jpg' },
    { id: 'raid20', name: 'Raid 20', subtitle: 'ZG/AQ20', cycle: 3, ref: REFERENCE_DATES.raid20, img: 'assets/aq20.jpg' },
    { id: 'timbermaw', name: 'Timbermaw', subtitle: 'Timbermaw Hold', cycle: 7, ref: REFERENCE_DATES.timbermaw, img: 'assets/tmhold.jpg' },
    { id: 'honor', name: 'Honor Reset', subtitle: 'Rank Progression', cycle: 7, ref: REFERENCE_DATES.honor, img: 'assets/honorreset.jpeg' },
    { id: 'weeklyQuests', name: 'Weekly Quests', subtitle: 'Quest Reset', cycle: 7, ref: REFERENCE_DATES.weeklyQuests, img: 'assets/questsreset.jpg' },
    { id: 'eom', name: 'Edge of Madness', subtitle: 'Zul\'Gurub Boss', cycle: 14, ref: REFERENCE_DATES.eom, img: 'assets/eom.jpg' },
    { id: 'bg', name: 'Battleground', subtitle: 'BG of the day', cycle: 1, ref: REFERENCE_DATES.bg, img: 'assets/pvp.jpg', isSchedule: true, link: 'bg-schedule.html' },
    { id: 'dmf', name: 'Darkmoon Faire', subtitle: 'Faire Location', cycle: 7, ref: REFERENCE_DATES.dmf, img: 'assets/darkmoon.webp', isSchedule: true, link: 'dmf-schedule.html' }
];

const EOM_BOSSES = ['Gri\'lek', 'Hazza\'rah', 'Renataki', 'Wushoolay'];
const BG_ROTATION = ['Alterac Valley', 'Warsong Gulch', 'Arathi Basin', 'Blood Ring Arena', 'Thorn Gorge'];
const DMF_LOCATIONS = ['Thunder Bluff', 'Goldshire'];

function parseDate(str) {
    const [date, time] = str.split(' ');
    const [d, m, y] = date.split('/').map(Number);
    const [hh, mm, ss] = time.split(':').map(Number);
    return Date.UTC(y, m - 1, d, hh, mm, ss);
}

function getNextReset(refStr, cycleDays) {
    const now = Date.now();
    const ref = parseDate(refStr);
    const cycleMs = cycleDays * 24 * 60 * 60 * 1000;
    const passed = Math.floor((now - ref) / cycleMs);
    return ref + (passed + 1) * cycleMs;
}

function formatTime(ms) {
    const totalSecs = Math.floor(ms / 1000);
    const days = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return { days, hours, mins, secs };
}

function updateTimers() {
    const now = Date.now();

    EVENTS.forEach(event => {
        const nextReset = getNextReset(event.ref, event.cycle);
        const diff = nextReset - now;
        const time = formatTime(diff);

        const container = document.getElementById(`${event.id}-timer`);
        if (container) {
            const values = container.querySelectorAll('.countdown-value');
            if (values.length === 4) {
                values[0].textContent = time.days;
                values[1].textContent = time.hours;
                values[2].textContent = time.mins;
                values[3].textContent = time.secs;
            } else if (values.length === 3) {
                values[0].textContent = time.hours + (time.days * 24);
                values[1].textContent = time.mins;
                values[2].textContent = time.secs;
            }
        }

        const dateEl = document.getElementById(`${event.id}-date`);
        if (dateEl) {
            const dateObj = new Date(nextReset);
            dateEl.textContent = `Resets: ${dateObj.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}`;
        }

        // Special logic for names/subtitles
        if (event.id === 'eom') {
            const passed = Math.floor((now - parseDate(event.ref)) / (14 * 24 * 60 * 60 * 1000));
            const currentIdx = passed % EOM_BOSSES.length;
            const nextIdx = (currentIdx + 1) % EOM_BOSSES.length;
            document.getElementById('eom-name').textContent = EOM_BOSSES[currentIdx];
            document.getElementById('eom-next').textContent = `Next boss: ${EOM_BOSSES[nextIdx]}`;
        }

        if (event.id === 'bg') {
            const dayMs = 24 * 60 * 60 * 1000;
            const passed = Math.floor((now - parseDate(event.ref)) / dayMs);
            const currentIdx = passed % BG_ROTATION.length;
            const nextIdx = (currentIdx + 1) % BG_ROTATION.length;
            document.getElementById('bg-name').textContent = BG_ROTATION[currentIdx];
            document.getElementById('bg-next').textContent = `Next: ${BG_ROTATION[nextIdx]}`;
        }

        if (event.id === 'dmf') {
            const weekMs = 7 * 24 * 60 * 60 * 1000;
            const passed = Math.floor((now - parseDate(event.ref)) / weekMs);
            const currentIdx = passed % DMF_LOCATIONS.length;
            document.getElementById('dmf-name').textContent = DMF_LOCATIONS[currentIdx];
        }
    });
}

// Initial call and interval
document.addEventListener('DOMContentLoaded', () => {
    updateTimers();
    setInterval(updateTimers, 1000);
});
