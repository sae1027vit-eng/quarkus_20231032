package org.acme.login;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.net.URI;
import java.io.InputStream;
import java.nio.file.Files;

import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import io.vertx.ext.web.RoutingContext;

import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

@Path("/")
public class AuthResource {

    @Inject
    RoutingContext context;

    // GET / → 세션 유무에 따라 메인 페이지 분기
    @GET
    @Produces(MediaType.TEXT_HTML)
    public Response mainPage() {
        String loginUser = context.session().get("loginUser");
        System.out.println("=== [GET /] 세션 ID : " + context.session().id());
        System.out.println("=== [GET /] loginUser : " + loginUser);

        String htmlPath = (loginUser != null)
                ? "META-INF/resources/login/main_after_login.html"
                : "META-INF/resources/main_index.html";

        InputStream html = getClass().getClassLoader().getResourceAsStream(htmlPath);
        return Response.ok(html).build();
    }

    // GET /login → 로그인 페이지
    @GET
    @Path("/login")
    @Produces(MediaType.TEXT_HTML)
    public Response loginPage() {
        InputStream html = getClass()
                .getClassLoader()
                .getResourceAsStream("META-INF/resources/login/login.html");
        return Response.ok(html).build();
    }

    // POST /login_check → DB 로그인 처리
    @POST
    @Path("/login_check")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response loginCheck(
            @FormParam("username") String username,
            @FormParam("password") String password) {

        User user = User.findByUsername(username);

        if (user == null || !user.password.equals(password)) {
            return Response
                    .seeOther(URI.create("/login?error=1"))
                    .build();
        }

        context.session().put("loginUser", username);

        return Response
                .seeOther(URI.create("/after_login"))
                .build();
    }

    // GET /after_login → 로그인 후 페이지
    @GET
    @Path("/after_login")
    @Produces(MediaType.TEXT_HTML)
    public Response afterLogin() {
        String loginUser = context.session().get("loginUser");

        System.out.println("=== 세션 ID : " + context.session().id());
        System.out.println("=== loginUser : " + loginUser);

        // 로그인 안 된 경우
        if (loginUser == null) {
            return Response
                    .seeOther(URI.create("/login"))
                    .build();
        }

        // 로그인 된 경우
        InputStream html = getClass()
                .getClassLoader()
                .getResourceAsStream("META-INF/resources/login/main_after_login.html");
        return Response.ok(html).build();
    }

    // GET /logout?next=login → 로그아웃 후 이동 경로 분기
    // @QueryParam("next"): URL의 ?next= 값을 String next 변수로 자동 추출
    @GET
    @Path("/logout")
    public Response logout(@QueryParam("next") String next) {
        // 로그아웃 전 세션 정보 출력
        System.out.println("=== 로그아웃 전 세션 ID : " + context.session().id());
        System.out.println("=== 로그아웃 전 loginUser : " + context.session().get("loginUser"));
        // 세션 전체 삭제
        context.session().destroy();
        // 로그아웃 후 세션 정보 출력
        System.out.println("=== 로그아웃 후 세션 ID : " + context.session().id());
        System.out.println("=== 로그아웃 후 loginUser : " + context.session().get("loginUser"));
        // ?next=login 이면 /login으로, 그 외는 / (메인)으로 이동
        String redirect = (next != null && next.equals("login")) ? "/login" : "/";
        return Response
                .seeOther(URI.create(redirect))
                .build();
    }

    @GET
    @Path("/register")
    @Produces(MediaType.TEXT_HTML)
    public Response registerPage() {
        InputStream html = getClass()
                .getClassLoader()
                .getResourceAsStream("META-INF/resources/login/register.html");
        return Response.ok(html).build();
    }

    @POST
    @Path("/register_check")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.TEXT_HTML)
    public Response registerCheck(
            @FormParam("username") String username,
            @FormParam("password") String password, // SHA-256 해시값
            @FormParam("email") String email,
            @FormParam("phone") String phone) {

        // ① 아이디 중복 체크
        if (User.findByUsername(username) != null) {
            return Response
                    .seeOther(URI.create("/register?error=duplicate_username"))
                    .build();
        }

        // ② 이메일 중복 체크
        if (User.findByEmail(email) != null) {
            return Response
                    .seeOther(URI.create("/register?error=duplicate_email"))
                    .build();
        }

        // ③ DB 삽입
        User newUser = new User();
        newUser.username = username;
        newUser.password = password; // 해시값 저장
        newUser.email = email;
        newUser.phone = phone;
        newUser.persist();

        // ④ 가입 완료 페이지로 이동
        return Response
                .seeOther(URI.create("/register_success"))
                .build();
    }

    @GET
    @Path("/register_success")
    @Produces(MediaType.TEXT_HTML)
    public Response registerSuccess() {
        InputStream html = getClass()
                .getClassLoader()
                .getResourceAsStream("META-INF/resources/login/register_success.html");
        return Response.ok(html).build();
    }

    @GET
    @Path("/profile")
    @Produces(MediaType.TEXT_HTML)
    public Response profilePage() {

        // ① 세션 체크 (로그인 안 한 사용자 차단)
        String loginUser = context.session().get("loginUser");
        if (loginUser == null) {
            return Response
                    .seeOther(URI.create("/login"))
                    .build();
        }

        // ② DB에서 사용자 정보 조회
        User user = User.findByUsername(loginUser);

        // ③ 세션에 사용자 정보 저장 (HTML에서 활용)
        context.session().put("userEmail", user.email);
        context.session().put("userPhone", user.phone);
        context.session().put("profileImage",
                user.profileImage != null ? user.profileImage : "default.png");

        // ④ 프로필 페이지 반환
        InputStream html = getClass()
                .getClassLoader()
                .getResourceAsStream("META-INF/resources/login/profile.html");
        return Response.ok(html).build();
    }

    @GET
    @Path("/profile/info")
    @Produces(MediaType.APPLICATION_JSON)
    public Response profileInfo() {

        // 세션 체크
        String loginUser = context.session().get("loginUser");
        if (loginUser == null) {
            return Response.status(401).build();
        }

        // DB 조회
        User user = User.findByUsername(loginUser);

        // JSON 응답
        return Response.ok(
                Map.of(
                        "username",     user.username,
                        "email",        user.email        != null ? user.email        : "",
                        "phone",        user.phone        != null ? user.phone        : "",
                        "profileImage", user.profileImage != null ? user.profileImage : ""
                )
        ).build();
    }

    @POST
    @Path("/profile/upload")
    @Transactional
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response profileUpload(
            @RestForm("profileImage") FileUpload file) {

        // ① 세션 체크
        String loginUser = context.session().get("loginUser");
        if (loginUser == null) {
            return Response
                    .seeOther(URI.create("/login"))
                    .build();
        }

        try {
            // ② 확장자 검사
            String original = file.fileName();
            String ext = original.substring(
                    original.lastIndexOf('.') + 1).toLowerCase();
            if (!ext.matches("jpg|jpeg|png|gif|webp")) {
                return Response
                        .seeOther(URI.create("/profile?error=invalid_type"))
                        .build();
            }

            // ③ 파일 크기 검사 (5MB)
            if (file.size() > 5 * 1024 * 1024) {
                return Response
                        .seeOther(URI.create("/profile?error=too_large"))
                        .build();
            }

            // ④ UUID 파일명 생성 + 저장
            String newFileName = UUID.randomUUID() + "." + ext;
            java.nio.file.Path uploadDir = Paths.get(
        "src/main/resources/META-INF/resources/uploads/profile");
            Files.createDirectories(uploadDir);
            Files.copy(
                file.uploadedFile(),
                uploadDir.resolve(newFileName),
                StandardCopyOption.REPLACE_EXISTING);

            // ⑤ DB 업데이트
            User user = User.findByUsername(loginUser);
            user.profileImage = newFileName;

            return Response
                    .seeOther(URI.create("/profile"))
                    .build();

        } catch (Exception e) {
            return Response
                    .seeOther(URI.create("/profile?error=upload_fail"))
                    .build();
        }
    }

    // POST /profile/update → 회원정보(이메일, 연락처) 수정
    // @Transactional: DB 변경 작업이므로 트랜잭션 처리 필수
    @POST
    @Path("/profile/update")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response profileUpdate(
            @FormParam("email") String email,
            @FormParam("phone") String phone) {

        // ① 세션 체크 (로그인 안 한 사용자 차단)
        String loginUser = context.session().get("loginUser");
        if (loginUser == null) {
            return Response
                    .seeOther(URI.create("/login"))
                    .build();
        }

        // ② 이메일 중복 체크 (본인 이메일은 허용)
        User found = User.findByEmail(email);
        if (found != null && !found.username.equals(loginUser)) {
            return Response
                    .seeOther(URI.create("/profile?error=duplicate_email"))
                    .build();
        }

        // ③ DB 업데이트
        User user = User.findByUsername(loginUser);
        user.email = email;
        user.phone = phone;

        return Response
                .seeOther(URI.create("/profile?success=updated"))
                .build();
    }

    // POST /profile/password → 비밀번호 변경
    @POST
    @Path("/profile/password")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response profilePassword(
            @FormParam("currentPassword") String currentPassword,
            @FormParam("newPassword")     String newPassword) {

        // ① 세션 체크
        String loginUser = context.session().get("loginUser");
        if (loginUser == null) {
            return Response
                    .seeOther(URI.create("/login"))
                    .build();
        }

        // ② 현재 비밀번호 확인 (SHA-256 해시값 비교)
        User user = User.findByUsername(loginUser);
        if (!user.password.equals(currentPassword)) {
            return Response
                    .seeOther(URI.create("/profile?error=wrong_password"))
                    .build();
        }

        // ③ 새 비밀번호로 DB 업데이트
        user.password = newPassword;

        return Response
                .seeOther(URI.create("/profile?success=password_changed"))
                .build();
    }
}