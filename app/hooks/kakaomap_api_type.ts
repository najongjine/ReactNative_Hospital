export interface KakaoPlace {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  x: string; // 경도 (longitude)
  y: string; // 위도 (latitude)
  distance?: string; // 선택적 필드: 거리 (미터 단위)
  place_url: string;
}

export interface KakaoSearchMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: {
    keyword: string;
    region: string[];
    selected_region: string;
  };
}

export interface KakaoKeywordSearchResponse {
  documents: KakaoPlace[];
  meta: KakaoSearchMeta;
}
