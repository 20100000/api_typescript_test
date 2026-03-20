export const createShortQuery = 'INSERT INTO shortenURLs(url, shortCode, createdAt, updatedAt) VALUES($1, $2, now(), now()) RETURNING *';
export const createStatisticQuery = 'INSERT INTO statistics(shortCode, accessCount, createdAt, updatedAt) VALUES($1, 0, now(), now()) RETURNING *';
export const getStatisticStatsQuery = 'SELECT url.*, s.accessCount FROM shortenURLs AS url INNER JOIN statistics as s ON url.shortCode = s.shortCode WHERE url.shortCode=$1';
export const updateStatisticsQuery = 'UPDATE statistics SET accessCount=$1, updatedAt=now() WHERE shortCode=$2 RETURNING *';
export const updateShortQuery = 'UPDATE shortenURLs SET url=$1, updatedAt=now() WHERE shortCode=$2 RETURNING *';
export const deleteShortQuery = 'DELETE FROM shortenURLs WHERE shortCode=$1';
export const deleteStatisticQuery = 'DELETE FROM statistics WHERE shortCode=$1';

