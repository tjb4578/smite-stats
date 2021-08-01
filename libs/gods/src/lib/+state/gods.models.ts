/**
 * Interface for the 'Gods' data
 */
export interface GodsEntity {
  id: string | number; // Primary ID
  Name: string;
  godIcon_URL: string;
  godCard_URL: string;
  latestGod: string;
}
