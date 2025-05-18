import axios from "axios";
import * as kakao_api_types from "./kakaomap_api_type";

export const searchPlacesByKeyword = async (
  query = "",
  x = "", // 경도. x long
  y = "", // 위도 y lang
  radius = "2000",
  category_group_code = "HP8",
  sort = "distance"
) => {
  let result: { success: boolean; data: any; code: string; message: string } = {
    success: true,
    data: null,
    code: "",
    message: ``,
  };
  try {
    const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;

    if (!KAKAO_REST_API_KEY) {
      result.success = false;
      result.data = null;
      result.code = `kakao_env_err`;
      result.message = "KAKAO_REST_API_KEY is not defined in environment variables";
      return result;
    }
    const kakaoAxios = axios.create({
      baseURL: "https://dapi.kakao.com",
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    });
    const response = await kakaoAxios.get("/v2/local/search/keyword.json", {
      params: {
        query,
        x,
        y,
        radius,
        category_group_code,
        sort,
      },
    });
    const places: kakao_api_types.KakaoKeywordSearchResponse = response?.data;
    result.data = places;
  } catch (error: any) {
    result.success = false;
    result.data = null;
    result.code = `kakaomap_api_error`;
    console.error("!!! kakaomap api error:", error?.message ?? "");
    throw error;
  }
};
