import { MemberData } from '../MemberItem/types';

export interface MembersListData {
    data: MemberData[];
    page: number | null;
    per_page: number | null;
    total: number | null;
    total_pages: number | null;
}
