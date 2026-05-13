package org.acme.login;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.io.InputStream;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import io.vertx.ext.web.RoutingContext;

@Path("/")
public class AuthResource {

    @Inject
    RoutingContext context;

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

    

    @GET
    @Path("/logout")
        public Response logout() {
        // 로그아웃 전 세션 정보출력
        System.out.println("=== 로그아웃 전 세션 ID : " + context.session().id());
        System.out.println("=== 로그아웃 전 loginUser : " + context.session().get("loginUser"));
        // 세션 전체 삭제
        context.session().destroy();
        // 로그아웃 후 세션 정보출력
     System.out.println("=== 로그아웃 후 세션 ID : " + context.session().id());
        System.out.println("=== 로그아웃 후 loginUser : " + context.session().get("loginUser"));
        return Response
            .seeOther(URI.create("/"))
            .build();

    }

    // AuthResource.java 아래 새로 추가
    @GET
    @Path("/register")
    @Produces(MediaType.TEXT_HTML)
    public Response registerPage() {
        InputStream html = getClass()
            .getClassLoader()
            .getResourceAsStream(
            "META-INF/resources/login/register.html");
        return Response.ok(html).build();
    }

}