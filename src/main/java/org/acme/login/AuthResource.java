package org.acme.login;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.io.InputStream;

@Path("/")
public class AuthResource {

    // GET /login → 로그인 HTML 페이지 반환
    @GET
    @Path("/login")
    @Produces(MediaType.TEXT_HTML)
    public Response loginPage() {
        InputStream html = getClass()
            .getClassLoader()
            .getResourceAsStream("META-INF/resources/login/login.html");
        return Response.ok(html).build();
    }

    // POST /login_check → 로그인 처리
    @POST
    @Path("/login_check")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response loginCheck(
        @FormParam("username") String username,
        @FormParam("password") String password) {

        return Response
            .seeOther(URI.create("/login/main_after_login.html"))
            .build();
    }

}  // ← 클래스 닫는 괄호는 맨 마지막에!