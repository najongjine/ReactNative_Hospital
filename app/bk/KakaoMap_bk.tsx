import React from "react";
import { StyleSheet, View } from "react-native";
// 📦 WebView는 HTML 기반 지도를 앱 화면에 띄워주는 도구입니다.
import { WebView } from "react-native-webview";

// 💡 KakaoMap 컴포넌트가 받아야 할 props: 위도와 경도
type KakaoMapProps = {
  latitude?: number;
  longitude?: number;
};

export default function KakaoMap({ latitude, longitude }: KakaoMapProps) {
  // 🔑 카카오 지도 API를 사용하려면 필요한 키입니다 (보안상 실제 앱에선 .env 파일로 관리해야 안전합니다)
  let KAKAO_MAP_JS_KEY = `150e98e3bd883753e02d811c6dfa864c`;
  const REST_API_KEY = `59498ffaa12716e02333174a9e4bac54`;
  // 🌐 WebView로 띄울 HTML 코드입니다. 안에 카카오 지도 JavaScript API를 넣었습니다.
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_JS_KEY}&libraries=services"></script>
        <style>
          body { margin: 0; padding: 0; height: 100%; }
          html { height: 100%; }
          #map { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          window.onload = function() {
            console.log('Kakao Map API Loaded');
            if (typeof kakao !== 'undefined' && kakao.maps) {
              console.log('Kakao Maps is available');
              const mapContainer = document.getElementById('map');
              const mapOption = {
                center: new kakao.maps.LatLng(${latitude}, ${longitude}),
                level: 3
              };
              // 🗺️ 카카오 지도 객체를 생성해서 실제로 화면에 지도를 보여주는 부분입니다.
const map = new kakao.maps.Map(mapContainer, mapOption);

              // 마커 추가 (선택 사항)
              const markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
              // 📍 지도 위에 마커(핀)를 꽂는 코드입니다. 중심 좌표와 같은 곳에 표시됩니다.
const marker = new kakao.maps.Marker({
                position: markerPosition
              });
              marker.setMap(map);
            } else {
              console.error('Kakao Maps is not available');
            }
          };
        </script>
      </body>
    </html>
  `;

  console.log(KAKAO_MAP_JS_KEY);

  // 📱 이 함수형 컴포넌트는 View 안에 WebView를 렌더링합니다.
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoad={() => console.log("WebView loaded successfully")}
        onError={(e) => console.error("WebView error: ", e.nativeEvent)}
        injectedJavaScript={`(function() {
          window.console.log = function(message) {
            window.ReactNativeWebView.postMessage(message);
          }
        })();`}
        onMessage={(event) => console.log(event.nativeEvent.data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  webview: {
    flex: 1,
  },
});
