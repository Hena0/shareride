import { GoogleGenerativeAI } from "@google/generative-ai";
import * as RNFS from 'react-native-fs'; // react-native-fs import

// API 키 (주의: 클라이언트 사이드에서 직접 사용하는 것은 보안상 위험)
const apiKey = "AIzaSyBKbjqwlu63qFSkfomut7wssmWR6pmpJeY";

if (!apiKey) {
  console.error("API 키가 설정되지 않았습니다.");
  // process.exit(1); // React Native에서는 process.exit 사용 불가
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // 모델 변경

const analyzeImage = async (imageUri: string, promptText: string = "사진 속의 킥보드가 정상적으로 주차되었는지 분류하세요. 답변은 정상, 혹은 비정상으로만 하세요. 차도에 주차되면 비정상, 주차구역에 정상적으로 주차된 경우 정상으로 분류하세요."): Promise<string> => {
  try {
    // react-native-fs를 사용하여 이미지 읽기
    const base64Image = await RNFS.readFile(imageUri, 'base64');

    const prompt = promptText;
    const image = {
      inlineData: {
        data: base64Image,
        mimeType: "image/png",
      },
    };

    const result = await model.generateContent([prompt, image]);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("이미지 분석 중 오류 발생:", error);
    return "이미지 분석에 실패했습니다.";
  }
};

export default analyzeImage;