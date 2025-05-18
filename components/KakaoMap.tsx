import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
// 📦 WebView는 HTML 기반 지도를 앱 화면에 띄워주는 도구입니다.
import * as Location from "expo-location";
import { WebView } from "react-native-webview";

// 💡 KakaoMap 컴포넌트가 받아야 할 props: 위도와 경도
type KakaoMapProps = {
  latitude?: number;
  longitude?: number;
};

export default function KakaoMap({ latitude, longitude }: KakaoMapProps) {
  // 🔑 카카오 지도 API를 사용하려면 필요한 키입니다 (보안상 실제 앱에선 .env 파일로 관리해야 안전합니다)
  const KAKAO_MAP_JS_KEY = process.env.EXPO_PUBLIC_KAKAO_MAP_JS_KEY;
  const REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;
  const webViewRef = useRef<WebView>(null);

  // 📌 현재 위치의 경도(longitude)를 저장할 상태 변수입니다.
  const [mylongitude, setMyLongitude] = useState<number>(0);
  // 📌 현재 위치의 위도(latitude)를 저장할 상태 변수입니다.
  const [mylatitude, setMyLatitude] = useState<number>(0);

  const handleDrawRoute = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      const payload = {
        type: "DRAW_ROUTE",
        payload: {
          startLat: coords.latitude,
          startLng: coords.longitude,
        },
      };
      webViewRef.current?.postMessage(JSON.stringify(payload));
    } catch (error) {
      console.error("위치 정보를 가져오는 데 실패했습니다:", error);
    }
  };

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
        let map=null;
        const currentPosition = {
          latitude: ${mylatitude},
          longitude: ${mylongitude}
        };
        const destination = {
          latitude: ${latitude},
          longitude: ${longitude}
        };
        const REST_API_KEY = '${REST_API_KEY}';

document.addEventListener("message", function(event) {
  const msg = JSON.parse(event.data);
  if (msg.type === "DRAW_ROUTE") {
    window.drawPolyLine(msg.payload);
  }
});

window.drawPolyLine = async function(payload) {
  const { startLat, startLng } = payload;
  const endLat = destination.latitude;
  const endLng = destination.longitude;

      // 출발지 마커 생성
  const kakaoStartPosition = new kakao.maps.LatLng(startLat, startLng);
  const startMarker = new kakao.maps.Marker({
    position: kakaoStartPosition,
    map: map,
  });

  // 출발지 커스텀 오버레이 생성
  const startOverlay = new kakao.maps.CustomOverlay({
    position: kakaoStartPosition,
    content: '<div style="padding:5px; background-color:white; border:1px solid black; border-radius:3px;">출발</div>',
    yAnchor: 0,
  });
  startOverlay.setMap(map);
  const url = "https://apis-navi.kakaomobility.com/v1/directions";
  const origin = \`\${startLng},\${startLat}\`;
  const destinationStr = \`\${endLng},\${endLat}\`;

  const headers = {
    Authorization: \`KakaoAK \${REST_API_KEY}\`,
    "Content-Type": "application/json",
  };

  const queryParams = new URLSearchParams({
    origin: origin,
    destination: destinationStr,
  });
  
  const requestUrl = \`\${url}?\${queryParams.toString()}\`;

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(\`API 요청 실패: \${response.status}\`);
    }

    const data = await response.json();
    alert("ok")
    const linePath = [];
    data.routes[0].sections[0].roads.forEach((road) => {
      for (let i = 0; i < road.vertexes.length; i += 2) {
        const lng = road.vertexes[i];
        const lat = road.vertexes[i + 1];
        linePath.push(new kakao.maps.LatLng(lat, lng));
      }
    });

    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: "green",
      strokeOpacity: 0.7,
      strokeStyle: "solid",
    });

    polyline.setMap(map);
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(new kakao.maps.LatLng(startLat, startLng));
    bounds.extend(new kakao.maps.LatLng(endLat, endLng));
    map.setBounds(bounds);
  } catch (error) {
    console.error("경로 그리기 오류:", error);
  }
  
};

          window.onload = function() {
            if (typeof kakao !== 'undefined' && kakao.maps) {
              const mapContainer = document.getElementById('map');
              const mapOption = {
                center: new kakao.maps.LatLng(${latitude}, ${longitude}),
                level: 3
              };
              // 🗺️ 카카오 지도 객체를 생성해서 실제로 화면에 지도를 보여주는 부분입니다.
map = new kakao.maps.Map(mapContainer, mapOption);

              // 마커 추가 (선택 사항)
              const markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
              // 📍 지도 위에 마커(핀)를 꽂는 코드입니다. 중심 좌표와 같은 곳에 표시됩니다.
const marker = new kakao.maps.Marker({
                position: markerPosition
              });
              marker.setMap(map);
            } else {
              alert('Kakao Maps is not available');
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
      <Text>KAKAO_MAP_JS_KEY : {KAKAO_MAP_JS_KEY}</Text>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoad={() => {
          console.log("WebView loaded");
          webViewRef.current?.injectJavaScript("");
        }}
        onError={(e) => console.error("WebView error: ", e.nativeEvent)}
        injectedJavaScript={`(function() {
          window.console.log = function(message) {
            window.ReactNativeWebView.postMessage(message);
          }
        })();`}
        onMessage={(event) => console.log(event.nativeEvent.data)}
      />
      <Button title="경로찾기" onPress={handleDrawRoute} />
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
