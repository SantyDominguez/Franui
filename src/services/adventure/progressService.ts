export function calculateProgress(totalMissions: number, completedMissions: number) {
  if (totalMissions <= 0) return 0;
  return Math.min(100, Math.round((completedMissions / totalMissions) * 100));
}
