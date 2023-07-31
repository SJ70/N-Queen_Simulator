## 230512

### 문제 선택 화면 퍼블리싱

### 문제에 대한 클래스 작성

캡슐화를 위해 private 및 getter 사용

## 230515

### N-Queen 알고리즘

#### 알고리즘 
알고리즘 실행 시, 체스판의 상태가 변화(true->false, false->true)하는 좌표를 배열에 저장  
이 때 최적화를 위하여 좌표를 객체로 저장하지 않고 하나의 number 타입으로 인코딩하여 저장  
예 : (12,13) : 1213, (4,5) : 405  

#### 디스플레이
useState 사용 시 배열의 값 변화는 감지되지 않음  
배열의 주소 자체는 변하지 않기 때문  

이를 해결하기 위해 보통 깊은 복사를 이용  
하지만 해당 프로그램의 경우 깊은 복사를 사용 시 N^2만큼의 시간이 소모됨  
이를 단축시키기 위하여 배열의 각 값에 대한 useState들을 같은 크기의 배열로 선언  

#### Refactor
불필요한 validate 제거
handler 메소드 사용
url로 id 삽입 시 범위 밖의 값이 허용되는 현상 검증  


## 230731

### N-Queen

ClearInterval이 제대로 실행되지 않던 오류 해결

## 이미지 출처

### App

백준 로고, 레벨 [[백준]](https://www.acmicpc.net/problemset)

### N-Queen

흰색 퀸 [[Fandom]](https://chess.fandom.com/wiki/Queen)
