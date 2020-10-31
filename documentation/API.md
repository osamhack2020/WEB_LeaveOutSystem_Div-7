# 출타관리체계 REST API 문서

# 유저 관리

## `POST /auth/login`

로그인하고, 인증 Token을 발급받습니다.

#### Params

<table>
<tr>
<td>username</td>
<td>로그인할 사용자의 아이디</td>
</tr>
<tr>
<td>password</td>
<td>로그인할 사용자의 비밀번호</td>
</tr>
</table>

#### Result

로그인 토큰

## `GET /users`

소속 부대의 유저 정보들을 모두 가져옵니다.

#### Result

유저 정보 Array

## `POST /users`

유저를 생성합니다.

#### Params

<table>
<tr>
<td>username</td>
<td>유저의 아이디</td>
</tr>
<tr>
<td>password</td>
<td>유저의 비밀번호</td>
</tr>
<td>name</td>
<td>유저의 이름</td>
</tr>
<td>division</td>
<td>유저의 소속 부대</td>
</tr>
<td>role</td>
<td>유저의 권한</td>
</tr>
</table>

## `PATCH /users/:user_id`

유저 정보를 수정합니다.

`user_id` : 수정할 유저의 ID

#### Params

<table>
<tr>
<td>password</td>
<td>유저의 비밀번호</td>
</tr>
<td>name</td>
<td>유저의 이름</td>
</tr>
<td>division</td>
<td>유저의 소속 부대</td>
</tr>
<td>role</td>
<td>유저의 권한</td>
</tr>
</table>

## `DELETE /users/:user_id`

유저를 삭제합니다.

`user_id` : 수정할 유저의 ID

# 부대 관리

## `GET /division`

모든 부대들의 정보를 조회합니다.

#### Result

부대 정보 Array

## `POST /division`

부대를 생성합니다.

#### Params

<table>
<tr>
<td>name</td>
<td>부대 이름</td>
</tr>
</table>

## `GET /division/:division_id`

부대 하나의 정보를 조회합니다.

`division_id` : 부대 ID

#### Result

부대 정보

## `DELETE /division/:division_id`

부대를 삭제합니다.

`division_id` : 부대 ID

# 출타 부여

## `GET /leaveTokens`

소속 부대의 전체 출타부여 정보를 가져옵니다.

#### Result

출타 정보 Array

## `POST /leaveTokens`

출타부여 정보를 생성합니다.

#### Params

<table>
<tr>
<td>type</td>
<td>출타 종류 (휴가, 외출, 외박 등)</td>
</tr>
<tr>
<td>kind</td>
<td>출타 유형 (포상, 위로, 정기 등)</td>
</tr>
<tr>
<td>amount</td>
<td>출타 일수</td>
</tr>
<tr>
<td>reason</td>
<td>근거</td>
</tr>
<tr>
<td>effectiveDate</td>
<td>시작 일자</td>
</tr>
<tr>
<td>expirationDate</td>
<td>만료 일자</td>
</tr>
</table>

# 출타

## `GET /leave/available`

사용가능한 유저 출타 목록을 가져옵니다.

#### Result

사용 가능 출타 정보 Array

## `GET /leave/apply`

유저의 신청한 출타 정보를 가져옵니다.

#### Result

신청한 출타 정보 Array

## `GET /leave/admin/apply`

전체 유저의 신청한 출타 정보를 가져옵니다.

#### Result

신청한 출타 정보 Array

## `POST /leave/apply`

출타를 신청합니다.

#### Params

<table>
<tr>
<td>departure</td>
<td>출발일</td>
</tr>
<tr>
<td>tokens</td>
<td>사용하는 출타 ID Array</td>
</tr>
</table>

## `GET /leave/apply-history`

신청한 출타의 과거 정보를 가져옵니다.

#### Result

신청한 출타 과거 정보 Array

## `GET /leave/accepted`

승인된 모든 출타를 가져옵니다.

#### Result

승인된 출타 정보 Array

## `POST /leave/admin/decide`

관리자가 출타를 승인 또는 거부합니다.

#### Params

<table>
<tr>
<td>status</td>
<td>accepted or denied or pending</td>
</tr>
<tr>
<td>apply</td>
<td>승인 또는 거부할 출타 ID</td>
</tr>
</table>
