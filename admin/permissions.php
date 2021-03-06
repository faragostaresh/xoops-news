<?php
/*
 You may not change or alter any portion of this comment or credits
 of supporting developers from this source code or any supporting source code
 which is considered copyrighted (c) material of the original comment or credit authors.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*/

/**
 * News Admin page
 *
 * @copyright   The XOOPS Project http://sourceforge.net/projects/xoops/
 * @license     http://www.fsf.org/copyleft/gpl.html GNU public license
 * @author      Hossein Azizabadi (AKA Voltan)
 * @version     $Id$
 */

require dirname(__FILE__) . '/header.php';
include_once XOOPS_ROOT_PATH . '/class/xoopstopic.php';
include_once XOOPS_ROOT_PATH . '/class/xoopslists.php';
include_once XOOPS_ROOT_PATH . '/class/xoopsform/grouppermform.php';


// Display Admin header
xoops_cp_header();

// Check admin have access to this page
$group = $xoopsUser->getGroups();
$groups = xoops_getModuleOption('admin_groups', 'news');
if (count(array_intersect($group, $groups)) <= 0) {
    redirect_header('index.php', 3, _NOPERM);
}

// Add module stylesheet
$xoTheme->addStylesheet(XOOPS_URL . '/modules/news/css/admin.css');
$xoTheme->addStylesheet(XOOPS_URL . '/modules/system/css/admin.css');

$permtoset = isset($_POST["permtoset"]) ? intval($_POST["permtoset"]) : 1;
$selected = ["", "", ""];
$selected[$permtoset - 1] = " selected";

$xoopsTpl->assign('selected0', $selected[0]);
$xoopsTpl->assign('selected1', $selected[1]);
$xoopsTpl->assign('selected2', $selected[2]);

$module_id = $xoopsModule->getVar('mid');

switch ($permtoset) {
    case 1:
        $title_of_form = _NEWS_AM_PERMISSIONS_GLOBAL;
        $perm_name = 'news_ac';
        $perm_desc = "";
        $global_perms_array = [
            //'4' => _NEWS_AM_PERMISSIONS_GLOBAL_4, //we add Rate system for next version
            '8'  => _NEWS_AM_PERMISSIONS_GLOBAL_8,
            '16' => _NEWS_AM_PERMISSIONS_GLOBAL_16,
        ];
        break;
    case 2:
        $title_of_form = _NEWS_AM_PERMISSIONS_ACCESS;
        $perm_name = "news_view";
        $perm_desc = "";
        break;

    case 3:
        $title_of_form = _NEWS_AM_PERMISSIONS_SUBMIT;
        $perm_name = "news_submit";
        $perm_desc = "";
        break;

    case 4:
        $title_of_form = _NEWS_AM_PERMISSIONS_APPROVE;
        $perm_name = "news_approve";
        $perm_desc = "";
        break;
}

$permform = new XoopsGroupPermForm($title_of_form, $module_id, $perm_name, $perm_desc, "admin/permissions.php");

if ($permtoset == 1) {
    foreach ($global_perms_array as $perm_id => $perm_name) {
        $permform->addItem($perm_id, $perm_name);
    }
    $xoopsTpl->assign('permform', $permform->render());
} else {
    $xt = new XoopsTopic($xoopsDB->prefix("news_topic"));
    $alltopics = $xt->getTopicsList();

    foreach ($alltopics as $topic_id => $topic) {
        $permform->addItem($topic_id, $topic["title"], $topic["pid"]);
    }

    //check if topics exist before rendering the form and redirect, if there are no topics   
    if ($topic_handler->NewsTopicCount()) {
        $xoopsTpl->assign('permform', $permform->render());
    } else {
        NewsUtils::NewsUtilityRedirect('topic.php?op=new_topic', 02, _NEWS_AM_MSG_NOPERMSSET);
        // Include footer
        xoops_cp_footer();
        exit ();
    }
}

$xoopsTpl->assign('navigation', 'permission');
$xoopsTpl->assign('navtitle', _NEWS_MI_PERM);

// Call template file
$xoopsTpl->display(XOOPS_ROOT_PATH . '/modules/news/templates/admin/news_permissions.tpl');
unset ($permform);

include "footer.php";
xoops_cp_footer();
?>
