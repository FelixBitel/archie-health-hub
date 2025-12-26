const STORAGE_KEY = 'archie_health_entries';

export function loadHealthData() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { entries: [] };
}

export function saveHealthEntry(entry) {
    const data = loadHealthData();
    data.entries.push(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getAllEntries() {
    return loadHealthData().entries;
}
