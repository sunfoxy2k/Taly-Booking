import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './provider/auth.service'
import { UserService } from './provider/user.service'
import { RegisterDto, SearchDto } from './dto'

@Controller('user')
export class UserManagementController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('auth')
    async login(@Request() req) {
      return this.authService.generateToken(req.user)
    }

    @Post('register')
    async register(@Body() body: any) {
        console.log(body)
        await this.userService.register(body)
        return {
            code: 'SUCCESS',
            message: 'User created',
        }
    }

    @Post('search/psychiatrist')
    async searchPsychiatrist(@Body() body: any) {
        console.log(body.keyword)
        const result = await this.userService.fullTextSearchPsychiatrist(body)
        return {
            code: 'SUCCESS',
            message: 'Search psychiatrist success',
            data: result,
        }
    }

    @Post('generate/psychiatrist')
    async generatePsychiatrist(@Body() body: any) {
        const result = await this.userService.generatePsychiatrist(body)
        return {
            code: 'SUCCESS',
            message: 'Generate psychiatrist success',
            data: result,
        }
    }
}
