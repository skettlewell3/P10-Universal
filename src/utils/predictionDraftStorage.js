export const loadPredictionDrafts = (storageKey) => {
    if (!storageKey) return {};

    try {
        const raw = sessionStorage.getItem(storageKey);

        if (!raw) return {};

        const stored = JSON.parse(raw);

        if (
            stored.expiresAt &&
            new Date(stored.expiresAt).getTime() <= Date.now()
        ) {
            sessionStorage.removeItem(storageKey);
            return {};
        }

        return stored.drafts ?? {};
    } catch (error) {
        console.error("Failed to load prediction drafts:", error);
        sessionStorage.removeItem(storageKey);
        return {};
    }
};

export const savePredictionDrafts = (
    storageKey,
    drafts,
    expiresAt
) => {
    if (!storageKey) return;

    try {
        if (!drafts || Object.keys(drafts).length === 0) {
            sessionStorage.removeItem(storageKey);
            return;
        }

        sessionStorage.setItem(
            storageKey,
            JSON.stringify({
                drafts,
                expiresAt: expiresAt ?? null,
            })
        );
    } catch (error) {
        console.error("Failed to save prediction drafts:", error);
    }
};

export const clearPredictionDrafts = (storageKey) => {
    if (!storageKey) return;

    sessionStorage.removeItem(storageKey);
};